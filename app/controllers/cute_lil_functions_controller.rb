class CuteLilFunctionsController < ApplicationController
  
  def get_matrix_html_from_dimensions
    x = params[:x].to_i
    y = params[:y].to_i
    
    render 'cute_lil_functions/get_matrix_html_from_dimensions', :layout => false, :locals => { :x => x, :y => y }
  end
  
  def get_sum_of_squares_data_for_array
    matrix = params[:matrix].gsub('null', '0')
    matrix = JSON.parse(matrix)
    
    begin
      s = Exc1SumSquares::Solver.new(matrix)
      s.calculate_sums
      render :json => s.to_json;
    
    rescue
      puts "ERROR"
      render :json => false.to_json;
    end
    
    
    
  end

end
