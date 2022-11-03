require "test_helper"

class BiographyBlocksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @biography_block = biography_blocks(:one)
  end

  test "should get index" do
    get biography_blocks_url, as: :json
    assert_response :success
  end

  test "should create biography_block" do
    assert_difference("BiographyBlock.count") do
      post biography_blocks_url, params: { biography_block: { content: @biography_block.content, title: @biography_block.title, user_id: @biography_block.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show biography_block" do
    get biography_block_url(@biography_block), as: :json
    assert_response :success
  end

  test "should update biography_block" do
    patch biography_block_url(@biography_block), params: { biography_block: { content: @biography_block.content, title: @biography_block.title, user_id: @biography_block.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy biography_block" do
    assert_difference("BiographyBlock.count", -1) do
      delete biography_block_url(@biography_block), as: :json
    end

    assert_response :no_content
  end
end
