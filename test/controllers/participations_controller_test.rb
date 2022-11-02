require "test_helper"

class ParticipationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @participation = participations(:one)
  end

  test "should get index" do
    get participations_url, as: :json
    assert_response :success
  end

  test "should create participation" do
    assert_difference("Participation.count") do
      post participations_url, params: { participation: { event_id: @participation.event_id, user_id: @participation.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show participation" do
    get participation_url(@participation), as: :json
    assert_response :success
  end

  test "should update participation" do
    patch participation_url(@participation), params: { participation: { event_id: @participation.event_id, user_id: @participation.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy participation" do
    assert_difference("Participation.count", -1) do
      delete participation_url(@participation), as: :json
    end

    assert_response :no_content
  end
end
