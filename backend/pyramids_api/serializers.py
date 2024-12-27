from rest_framework import serializers

from pyramids_api.models import Medication, RefillRequeust

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'

class MedicationRefillRequestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefillRequeust
        fields = '__all__'

class RefillRequestAggregatedSerializer(serializers.Serializer):
    name = serializers.CharField(source='medication__name')
    refillRequestsCount = serializers.IntegerField(source='count')
