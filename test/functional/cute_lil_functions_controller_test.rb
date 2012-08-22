require 'test_helper'

class CuteLilFunctionsControllerTest < ActionController::TestCase
  test "should get get_matrix_html_from_dimensions" do
    get :get_matrix_html_from_dimensions
    assert_response :success
  end

end
