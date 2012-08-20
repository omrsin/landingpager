class CoreController < ApplicationController
  def home
  	@imageHeader = "http://lh6.ggpht.com/25793yreGRKUc9Ea8Q02M4B-oQ0btCdKa7XD8Ss5QHYAO9ZPz0-sXop_sieL5_ALT7gixGMHNr5744Xg5w=s128-c"
  	@imageSectionOne = ['http://www.hartwellfencingandpaving.co.uk/county_large/frombrilltobicester.jpg',
  									    'http://www.hartwellfencingandpaving.co.uk/county_large/winteroverLongCrendon.jpg',
  									    'http://www.j-kaufmann.at/wp-content/uploads/2012/05/Gal_Mops1421-e1337938655426.jpg']
  	@imageSectionTwo = ['http://static.wix.com/media/cec2ee_b63b3c5263ee67a807bf0516bd2ebcc0.jpg_256',
  											'http://www.taylp.org/cmsfolder/data/img/gallery/tlp-gallery/FishingboatbytheTayReedBeedsCJeanBurhouse.jpg',
  											'http://static.wix.com/media/0fb85d_a6e76eccc4124c20c9459e3d866ec77f.jpg_256']
  	@imageSectionThree = ['http://1.bp.blogspot.com/-emXLaOJglYM/TkE72encqqI/AAAAAAAAAuk/6mrpcT1yKY8/s400/where-house-cats-roam_1.jpg',
  												'http://www.1art1.de/images/imagem/v//v56057.jpg',
  												'http://www.europeanpaintings.com/assets/Uploads/_resampled/croppedimage277277-news-04-michallon.jpg',
  												'http://www.scientificamerican.com/media/inline/climate-change-turns-into-money-problems-for-florida-keys_1.jpg']
  	@imageSectionFour = ['http://media-cache-lt0.pinterest.com/upload/251075747945426024_mYA6V41t_b.jpg',
  											 'http://mediastore.magnumphotos.com/CoreXDoc/MAG/Media/TR6/8/2/2/f/LON70844.jpg',
  											 'http://media-cache-lt0.pinterest.com/upload/183943966000779023_9OzLQH0n_b.jpg',
  											 'http://media-cache-ec6.pinterest.com/upload/40884309087586413_dKYn9OES_b.jpg']
  end
  
  def generate
  	respond_to do |format|
  		format.html { send_data generateMarkup(params[:html_string], params[:html_background]), 
  														filename: "landingpage.html" }
  	end
  end
  
  private	
  
  def generateMarkup(content, background)
  	upper = "<!DOCTYPE html>"+
  					"<html style=\"height: 100%;\">\n\t"+
  						"<head>\n\t\t"+
  							"<title>Landingpager Site</title>\n\t\t"+
								"<meta name=\"keywords\" content=\"\">\n\t\t"+
								"<meta name=\"description\" content=\"\">\n\t"+
								"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">"+
  						"</head>\n\t"+
  						"<body style=\"margin: 0; height: 100%; background: #{background}\">\n"
  	lower = 	"\n\t</body>\n"+
  					"</html>"
  	upper + content + lower
  end
end
