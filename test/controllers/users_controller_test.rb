require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: { user: { age: @user.age, email: @user.email, first_name: @user.first_name, friends_list: @user.friends_list, gender: @user.gender, last_name: @user.last_name, location: @user.location, password: @user.password, preferences: @user.preferences, username: @user.username } }, as: :json
    end

    assert_response :created
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { age: @user.age, email: @user.email, first_name: @user.first_name, friends_list: @user.friends_list, gender: @user.gender, last_name: @user.last_name, location: @user.location, password: @user.password, preferences: @user.preferences, username: @user.username } }, as: :json
    assert_response :success
  end

  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user), as: :json
    end

    assert_response :no_content
  end
end
