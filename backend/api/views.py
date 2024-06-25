from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from .serializers import DoctorSerializer
from .models import Doctor
from rest_framework.permissions import AllowAny, IsAuthenticated

class RegisterView(CreateAPIView):
    queryset = Doctor.objects.all()
    permission_classes = [AllowAny]
    serializer_class = DoctorSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
