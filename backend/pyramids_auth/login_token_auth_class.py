from django.conf import settings
from jose import jwe
import json
import logging
from rest_framework import authentication, exceptions
from pyramids_auth.models import User

logger = logging.getLogger(__name__)


class LoginTokenAuth(authentication.BaseAuthentication):

    def authenticate(self, request):
        try:
            token_data = json.loads(jwe.decrypt(request.META.get('HTTP_AUTHORIZATION'), settings.SECRET_KEY))
            u = User.objects.get(id=token_data['user_id'])
            assert token_data['nonce'] == str(u.current_token_nonce)
            assert u.is_active
        except Exception as e:
            raise exceptions.AuthenticationFailed("token authenticaiton failed")
        return (u, token_data)
