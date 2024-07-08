# myapp/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Patient, ClinicPhoto, PatientPhoto

class ClinicPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicPhoto
        fields = ['id' ,'photo']
        
    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo:
            photo_url = obj.photo.url
            if request is not None:
                return request.build_absolute_uri(photo_url)
            return photo_url
        return None

class PatientPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientPhoto
        fields = ['id', 'photo']
        
    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo:
            photo_url = obj.photo.url
            if request is not None:
                return request.build_absolute_uri(photo_url)
            return photo_url
        return None

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    clinic_photos = ClinicPhotoSerializer(many=True, read_only=True)
    break_photo = serializers.ImageField(required=False)

    class Meta:
        model = Doctor
        fields = ['user', 'userpic', 'clinic_photos', 'break_photo', 'static_text']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        doctor = Doctor.objects.create(user=user, **validated_data)
        return doctor

class DoctorUpdateSerializer(serializers.ModelSerializer):
    clinic_photos = ClinicPhotoSerializer(many=True, read_only=True)
    break_photo = serializers.ImageField(required=False)

    class Meta:
        model = Doctor
        fields = ['userpic', 'clinic_photos', 'break_photo', 'static_text']

class PatientSerializer(serializers.ModelSerializer):
    photos = PatientPhotoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Patient
        fields = ['id', 'name', 'diagnosis', 'photos', 'xray', 'treatment_plan', 'teeth_status']
