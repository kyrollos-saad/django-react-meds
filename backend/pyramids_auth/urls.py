from rest_framework.routers import SimpleRouter
from . import views

pyraminds_auth_router = SimpleRouter(trailing_slash=False)

pyraminds_auth_router.register("", views.AuthViewset, basename="auth")
