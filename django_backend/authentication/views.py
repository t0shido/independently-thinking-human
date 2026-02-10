"""
Authentication views for admin access.
Uses Django's built-in authentication with token-based auth for API.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Authenticate user and return token.
    
    POST /api/auth/login
    Body: { "username": "admin", "password": "..." }
    Returns: { "token": "...", "username": "..." }
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Username and password required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # Get or create token for user
        token, created = Token.objects.get_or_create(user=user)
        
        logger.info(f"Successful login for user: {username} from IP: {request.META.get('REMOTE_ADDR')}")
        
        return Response({
            'token': token.key,
            'username': user.username,
            'message': 'Login successful'
        })
    else:
        logger.warning(f"Failed login attempt for username: {username} from IP: {request.META.get('REMOTE_ADDR')}")
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Logout user by deleting their token.
    
    POST /api/auth/logout
    Headers: Authorization: Token <token>
    """
    try:
        # Delete the user's token
        request.user.auth_token.delete()
        logger.info(f"User {request.user.username} logged out from IP: {request.META.get('REMOTE_ADDR')}")
        return Response({'message': 'Logout successful'})
    except Exception as e:
        logger.error(f"Logout error for user {request.user.username}: {str(e)}")
        return Response(
            {'error': 'Logout failed'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_token(request):
    """
    Verify if token is valid.
    
    GET /api/auth/verify
    Headers: Authorization: Token <token>
    """
    return Response({
        'valid': True,
        'username': request.user.username
    })
