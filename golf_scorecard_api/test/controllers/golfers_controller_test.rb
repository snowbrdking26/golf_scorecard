require 'test_helper'

class GolfersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @golfer = golfers(:one)
  end

  test "should get index" do
    get golfers_url, as: :json
    assert_response :success
  end

  test "should create golfer" do
    assert_difference('Golfer.count') do
      post golfers_url, params: { golfer: { course: @golfer.course, player: @golfer.player } }, as: :json
    end

    assert_response 201
  end

  test "should show golfer" do
    get golfer_url(@golfer), as: :json
    assert_response :success
  end

  test "should update golfer" do
    patch golfer_url(@golfer), params: { golfer: { course: @golfer.course, player: @golfer.player } }, as: :json
    assert_response 200
  end

  test "should destroy golfer" do
    assert_difference('Golfer.count', -1) do
      delete golfer_url(@golfer), as: :json
    end

    assert_response 204
  end
end
