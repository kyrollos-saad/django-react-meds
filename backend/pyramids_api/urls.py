from rest_framework.routers import SimpleRouter
from . import views

pyraminds_api_router = SimpleRouter(trailing_slash=False)

pyraminds_api_router.register("medications", views.MedicationsViewset, basename="medications")
