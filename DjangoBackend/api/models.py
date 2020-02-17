from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Movie(models.Model):

    title = models.CharField(max_length=50)
    description = models.TextField(max_length=500)

    # A function to get ratings by their associated movie
    def number_of_ratings(self):

        # Get all rating objects filtered by the current movie object
        ratings = Rating.objects.filter(movie=self)

        return len(ratings)

    def average_rating(self):

        # Get all rating objects filtered by the current movie object
        ratings = Rating.objects.filter(movie=self)

        # add all of the ratings up
        sum = 0
        for rating in ratings:
            sum += rating.stars

        # calculate the average and return it
        return sum / len(ratings) if len(ratings) > 0 else 0

class Rating(models.Model):

    # Use validator classes to specify the min and max stars.
    # > We pass it as a list in validators variable
    stars = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    # One rating per movie per user. Both need ForeignKeys
    # If we remove the movie or the user obj, the rating is removed.
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:

        # If we already have a rating created by one user for one
        # movie and we want to create another rating for the same
        # user and the same movie, then it will be rejected.
        unique_together = (('user', 'movie'),)

        # The DB will index user and movie objects together when
        # creating a rating.
        index_together = (('user', 'movie'),)
