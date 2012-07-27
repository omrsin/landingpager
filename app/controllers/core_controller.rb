class CoreController < ApplicationController
  def home
  end
  
  def generate
  	respond_to do |format|
  		format.html { send_data generateMarkup(params[:html_string]), 
  														filename: "landingpage.html" }
  	end
  end
  
  private	
  
  def generateMarkup(content)
  	upper = "<!DOCTYPE html>"+
  					"<html style=\"height: 100%;\">\n\t"+
  						"<head>\n\t\t"+
  							"<title>Landingpager Site</title>\n\t\t"+
								"<meta name=\"keywords\" content=\"\">\n\t\t"+
								"<meta name=\"description\" content=\"\">\n\t"+
								"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">"+
  						"</head>\n\t"+
  						"<body style=\"margin: 0; height: 100%;\">\n"
  	lower = 	"\n\t</body>\n"+
  					"</html>"
  	upper + content + lower
  end
end
