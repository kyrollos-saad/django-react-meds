from datetime import datetime, timedelta
import json
from django.conf import settings
from jose import jwe
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from pyramids_auth.models import User
from django.utils.translation import gettext as _
import logging
from uuid import uuid4

from pyramids_auth.serializers import LoginTokenSerializer, UserSerializer

logger = logging.getLogger(__name__)

class AuthViewset(viewsets.ViewSet):

    @action(methods=["POST"], detail=False, url_path="register")
    def register(self, request, *args, **kwargs):
        request_data = request.data

        u, is_created = User.objects.get_or_create(
            username=request_data['email'],
            defaults={
                'first_name': request_data['firstName'],
                'last_name': request_data['lastName'],
            },
        )
        if not is_created:
            logger.error(f'auth | register | error: email already exists')
            return JsonResponse({
                'status': 'error',
                'frontend_msg': _('User with email {email} already exists').format(email=u.username),
            }, status=400)
        try:
            u.set_password(request_data['password'])
            u.save(update_fields=['password'])
        except Exception as e:
            logger.error(f'auth | register | error: {e}')
            return JsonResponse({
                'status': 'error', 
                'frontend_msg': _('password is too weak'),
                }, status=400)

        now = datetime.now()

        u.last_login = now
        u.current_token_nonce = uuid4()
        u.save(update_fields=['current_token_nonce'])

        token = str(jwe.encrypt(bytes(json.dumps(LoginTokenSerializer({
            'nonce': str(u.current_token_nonce),
            'user_id': u.id,
            'expires_at': now + timedelta(hours=settings.LOGIN_TOKEN_LIFESPAN_HOURS)
        }).data), 'utf8'), bytes(settings.SECRET_KEY, 'utf8'), algorithm="dir", encryption="A256GCM"), 'utf8')

        user_serialized = UserSerializer(u, context={'token': token}).data

        return JsonResponse({
            'status': 'success', 
            'user': user_serialized,
            'frontend_msg': _('User with email {email} has successfully registered').format(email=u.username),
            }, status=200)


    @action(methods=["POST"], detail=False, url_path="login")
    def login(self, request, *args, **kwargs):
        request_data = request.data

        u = User.objects.filter(username=request_data['email']).first()
        if not u:
            logger.error(f'auth | register | error: email not found')
            return JsonResponse({
                'status': 'error',
                'frontend_msg': _('User with email {email} not found').format(email=request_data['email'])
            }, status=400)
        try:
            assert u.check_password(request_data['password'])
        except Exception as e:
            logger.error(f'auth | register | error: user ({u.username}) wrong password')
            return JsonResponse({
                'status': 'success', 
                'frontend_msg': _('Email and/or password are not correct')
                }, status=400)

        now = datetime.now()

        u.last_login = now
        u.current_token_nonce = uuid4()
        u.save(update_fields=['current_token_nonce'])

        token = str(jwe.encrypt(bytes(json.dumps(LoginTokenSerializer({
            'nonce': str(u.current_token_nonce),
            'user_id': u.id,
            'expires_at': now + timedelta(hours=settings.LOGIN_TOKEN_LIFESPAN_HOURS)
        }).data), 'utf8'), bytes(settings.SECRET_KEY, 'utf8'), algorithm="dir", encryption="A256GCM"), 'utf8')

        user_serialized = UserSerializer(u, context={'token': token}).data

        return JsonResponse({
            'status': 'success', 
            'user': user_serialized,
            'frontend_msg': _('Welcome {email}').format(email=u.username),
            }, status=200)

    @action(methods=["DELETE"], detail=False, url_path="logout")
    def logout(self, request, *args, **kwargs):
        try:
            token_data = json.loads(jwe.decrypt(request.META.get('HTTP_AUTHORIZATION'), bytes(settings.SECRET_KEY, 'utf8')))
        except Exception as e:
            logger.error(f'auth | logout | warning: malformed token')
            return JsonResponse({'status': 'error'}, status=400)
        
        u = User.objects.filter(id=token_data['user_id']).first()
        if not u:
            logger.error(f'auth | logout | error: user not found')
            return JsonResponse({'status': 'error'}, status=400)
        
        if token_data['nonce'] == str(u.current_token_nonce):
            u.current_token_nonce = None
            u.save(update_fields=['current_token_nonce'])
        else:
            logger.warning(f'auth | logout | warning: old token')

        return JsonResponse({'status': 'success'}, status=200)
