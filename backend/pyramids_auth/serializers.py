from rest_framework import serializers

from pyramids_auth.models import User

class LoginTokenSerializer(serializers.Serializer):
    nonce = serializers.UUIDField()
    user_id = serializers.IntegerField()
    expires_at = serializers.DateTimeField()


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='username')
    token = serializers.SerializerMethodField(default=None)

    def get_token(self, obj):
        print(self.context)
        return self.context.get('token')

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'token']
