class CoreController < ApplicationController
  def home
  end
  
  def generate
  	respond_to do |format|
  		format.html { send_data params[:html_string], filename: "landingpage.html" }
  	end
  end
end
