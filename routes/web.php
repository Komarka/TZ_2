<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//make group in order not to paste the same middlware('auth')
Auth::routes();
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::middleware(['auth','XSSprotector'])->group(function () {
	Route::get('/','UserController@index');
Route::get('/getUserInfo','UserController@getUserInfo');
Route::post('/upload','UserController@upload');
Route::get('/upload','UserController@upload');
Route::get('/search','SearchController@search');
Route::post('/addFriend', 'FriendsController@addFriend');
Route::get('/news', 'FriendsController@getNews');
Route::get('/friends', 'FriendsController@getFriendsList');
Route::post('/acceptFriend','FriendsController@acceptFriend');
Route::post('/cancelFriend','FriendsController@cancelFriend');
Route::get('/onlineCount','FriendsController@onlineCount');
Route::get('/userLeft','UserController@onUserLeft');
Route::get('/userLeftDialogue','UserController@onUserLeftDialogue');
Route::get('/getFriendInfo/{id}','FriendsController@getFriendInfo');
Route::get('/removeFriend/{id}','FriendsController@removeFriend');
Route::post('/send','MessageController@send');
Route::get('/getAllMessages/{id}','MessageController@getAllMessages');
Route::get('/getDialogMessages/{id}','MessageController@getDialogMessages');
Route::get('/getMessages','MessageController@getMessages');
});

