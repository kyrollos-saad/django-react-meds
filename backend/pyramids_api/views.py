from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import action
from pyramids_api.models import Medication, RefillRequeust
from pyramids_api.serializers import MedicationRefillRequestsSerializer, MedicationSerializer, RefillRequestAggregatedSerializer
from pyramids_auth.login_token_auth_class import LoginTokenAuth
from django.db.models import Count

class MedicationsViewset(viewsets.ViewSet):
    authentication_classes = (LoginTokenAuth,)

    @action(methods=["GET"], detail=False, url_path="list")
    def list_meds(self, request, *args, **kwargs):
        # example data
        if Medication.objects.count() == 0:
            Medication.objects.bulk_create([
                Medication(**{'id': 1, 'name': 'Oplex'}),
                Medication(**{'id': 2, 'name': 'Congestal'}),
                Medication(**{'id': 3, 'name': 'Panadol Extra'}),
                Medication(**{'id': 4, 'name': 'Night & Day'}),
            ])
        # END: example data

        return JsonResponse({
            'status': 'success',
            'medications': MedicationSerializer(Medication.objects.all(), many=True).data,
        }, status=200)

    @action(methods=["POST"], detail=False, url_path="refill-request")
    def refill_request(self, request, *args, **kwargs):
        RefillRequeust.objects.create(
            requested_by=request.user,
            medication_id=request.data['medicationId'],
        )
        return JsonResponse({
            'status': 'success',
        }, status=201)

    @action(methods=["GET"], detail=False, url_path="refill-requests-list")
    def refill_requests_list(self, request, *args, **kwargs):
        aggregated_query = RefillRequeust.objects.filter(requested_by=request.user).values('medication__name').annotate(count=Count('medication'))
        aggregated_query_serialized = RefillRequestAggregatedSerializer(list(aggregated_query), many=True).data

        return JsonResponse({
            'status': 'success',
            'medications': aggregated_query_serialized,
        }, status=200)
