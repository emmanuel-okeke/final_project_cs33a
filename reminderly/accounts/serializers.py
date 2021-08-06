from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password


class UserAccountSerializer(serializers.ModelSerializer):
    """
    Serializer for the User Model
    """

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'firstname', 'lastname')



class LoginUserAccountSerializer(serializers.Serializer):
    """
    Serializer for the Login View
    """

    password = serializers.CharField()
    email = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError("Unable to log in with provided credentials.")



class RegisterUserAccountSerializer(serializers.ModelSerializer):
    """
    Serializer for the Register View
    """

    class Meta:
        model = get_user_model()
        fields = ('email', 'firstname', 'lastname', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
            user = get_user_model().objects.create_user(email=validated_data['email'],
            password=validated_data['password'], 
            firstname=validated_data['firstname'], lastname=validated_data['lastname'])

            return user 