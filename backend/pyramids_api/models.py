from django.db import models

class Medication(models.Model):
    name = models.CharField(max_length=100)


class RefillRequeust(models.Model):
    medication = models.ForeignKey(to='Medication', on_delete=models.CASCADE)
    requested_by = models.ForeignKey(to='pyramids_auth.User', on_delete=models.DO_NOTHING)
    amount = models.IntegerField(default=1)
