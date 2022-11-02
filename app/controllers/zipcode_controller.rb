require 'uri'
require 'net/http'
require 'openssl'

class ZipcodeController < ApplicationController
  skip_before_action :authorize
  
  API_KEY = Rails.application.credentials.redline_zipcode_apikey
  API_KEY_2 = Rails.application.credentials.geocode_apikey

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

  def coordinates
    uri = URI('https://geocode.xyz')

    params = {
        'auth' => API_KEY_2,
        'locate' => params[:location],
        'geoit' => 'json'
    }

    uri.query = URI.encode_www_form(params)

    response = Net::HTTP.get_response(uri)

    puts response.read_body
    body = JSON.parse(response.body)
    render json:body, status: 201
  end

  private

  def api_params
    params.permit(:zipcode, :location)
  end
end
