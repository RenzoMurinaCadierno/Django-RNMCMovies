from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Movie, Rating


class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        # A signup or login view will require sending username and
        # password via HTTP requests. This is unsafe as it is now,
        # we need to add extra security steps, like hashing.
        # > To be stored in the DB, we need to store them hashed too.
        fields = ('id', 'username', 'password')

        # pass additional kwargs to restrict the password from being
        # read in requests and to be obligatory for them.
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True
            }
        }

    # a custom function to intercept the user_creation, to get
    # the user in return.
    # > In the process, create a Token object for that user.
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
       model = Movie
       fields = ('id', 'title', 'description', 'number_of_ratings', 'average_rating')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'stars', 'user', 'movie')
