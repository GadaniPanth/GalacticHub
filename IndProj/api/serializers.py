from rest_framework import serializers
from .models import Post, Comment, Like, MyModels

class MyModelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModels
        fields = ['id', 'name', 'data']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'content', 'created_at']

    def validate(self, data):
        if not self.context['request'].user.is_authenticated:
            raise serializers.ValidationError('User must be authenticated to comment.')
        return data

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Like
        fields = ['id', 'post', 'user', 'created_at']

    def validate(self, data):
        if not self.context['request'].user.is_authenticated:
            raise serializers.ValidationError('User must be authenticated to like a post.')
        return data

class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    liked_by = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_by', 'created_at', 'comments', 'likes', 'liked_by']
