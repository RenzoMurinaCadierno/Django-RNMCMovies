from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    # Add rest_framework IsAuthenticated permission, which will
    # restrict this ViewSet only to logged in users.
    permission_classes = (AllowAny,)


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    # Tell Django how to manage User Authentication Tokens in
    # in the class. To fetch request.user correctly
    authentication_classes = (TokenAuthentication, )

    # Add rest_framework AllowAny permission, which will
    # allow this ViewSet to all users.
    permission_classes = (AllowAny,)

    # Custom method to rate the movies.
    # > PK: necessary to get the ID of the movie to rate.
    #     > It is required by the decorator, but the PK is grabbed
    #       from the URL by itself, though we need to set it as a
    #       starting parameter for the method to work.
    # > detail=True: it will not be available on movies/
    #     > You need to provide a specific movie ID
    # > methods: what methods will be accepted when calling it
    @action(detail=True, methods=['POST'])
    def rate_movie(self, request, pk=None):

        # Check if sth was passed as a request
        if 'stars' in request.data:

            # Get the data related to the fetched pk in the DB
            movie = Movie.objects.get(id=pk)
            stars = request.data['stars']

            # Authorization header Token specifies the logged in
            # user now
            user = request.user

            print(user.username, movie.title, stars)  # renzo eevee 3

            try:
                # try getting a rating with user and movie unique_together
                rating = Rating.objects.get(user=user.id, movie=movie.id)

                # If we got the rating before, then update the stars with
                # request.data
                rating.stars = stars

                # save to the DB
                rating.save()

                # Get ready to JSON stringify and send it to front-end.
                # Create a serializer and pass the data.
                serializer = RatingSerializer(rating, many=False)

                # we set up the response to send back to the front-end
                response = {
                    'message': 'Rating updated!',
                    'result': serializer.data
                }

                # return a rest_framework response on status 200
                return Response(response, status=status.HTTP_200_OK)

            except:

                # No rating found in try, create one Rating object instead,
                # passing all three required objects to instantiate it
                rating = \
                    Rating.objects.create(user=user, movie=movie, stars=stars)

                # Same as before
                serializer = RatingSerializer(rating, many=False)

                # we set up the response to send back to the front-end
                response = {
                    'message': 'Rating created!',
                    'result': serializer.data
                }

                # return a rest_framework response on status 200
                return Response(response, status=status.HTTP_200_OK)

        else:
            # no stars were provided, set the message up
            response = {'message': 'Need to provide a rating (1-5)'}

            # return a BAD Request response
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication, )

    # Add rest_framework IsAuthenticated permission, which will
    # restrict this ViewSet only to logged in users.
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        response = {'message': 'You cannot update ratings this way.'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'You cannot update ratings this way.'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)