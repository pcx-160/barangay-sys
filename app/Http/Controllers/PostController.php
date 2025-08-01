<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $user = $request->user();

        if ($user->username !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $fields = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif'
        ]);

        if ($request->hasFile('image')) {
        $fields['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = $request->user()->posts()->create($fields);

        return ['post' => $post, 'user' => $post->user];
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::find($id);

    if (!$post) {
        return response()->json(['message' => 'Post not found'], 404);
    }

    return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();

        if ($user->username !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $fields = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif'
        ]);

        $imagePath = $post->image;
        
        // Handle image update/removal
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            // Store new image
            $imagePath = $request->file('image')->store('posts', 'public');
        } elseif (isset($fields['remove_image'])) {
            // Handle case where frontend wants to remove the image
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $imagePath = null;
        }

        $post->update([
            'title' => $fields['title'],
            'content' => $fields['content'],
            'image' => $imagePath
        ]);

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        if ($user->username !== 'admin') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }
        $post = Post::find($id);

        if (!$post) { 
            return response()->json(['message' => 'Post not found'], 404);
        }

        if ($post->image && Storage::disk('public')->exists($post->image)) {
        Storage::disk('public')->delete($post->image);
    }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
