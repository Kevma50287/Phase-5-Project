require 'uri'
require 'net/http'
require 'openssl'

class ZipcodeController < ApplicationController
  skip_before_action :authorize
  
  API_KEY = Rails.application.credentials.redline_zipcode_apikey

  def location
    url = URI("https://redline-redline-zipcode.p.rapidapi.com/rest/multi-info.json/#{params[:zipcode]}/degrees")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    
    request = Net::HTTP::Get.new(url)
    request["X-RapidAPI-Key"] = API_KEY
    request["X-RapidAPI-Host"] = 'redline-redline-zipcode.p.rapidapi.com'
    
    response = http.request(request)
    body = JSON.parse(response.body)
    puts response.read_body
    render json:body, status: 201
  end

  private

  def api_params
    params.permit(:zipcode)
  end
end
