require 'spec_helper'

describe "CuteLilFunctionsController" do
  describe "GET /cute_lil_functions/get_sum_of_squares_data_for_array" do
    
    it "works!" do
      get "/cute_lil_functions/get_sum_of_squares_data_for_array?matrix=[[0,1],[2,3]]"
      response.status.should be(200)
    end
    
    it "shouldn't freak out if we give it nulls" do
      get "/cute_lil_functions/get_sum_of_squares_data_for_array?matrix=[[0,1],[2,null]]"
      response.status.should be(200)
    end
  end
end
