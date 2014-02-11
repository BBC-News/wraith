require 'wraith'
require 'wraith/wraith'

class Wraith::SaveImages
  attr_reader :wraith
  attr_accessor :paths, :labels

  def initialize(config)
    @wraith = Wraith::Wraith.new(config)
  end

  def directory
    wraith.directory
  end

  def check_paths
    if !wraith.paths
      path = File.read(wraith.spider_file)
      eval(path)
    else
      wraith.paths
    end
  end

  def labels_paths
    check_paths.each do |label, path|
      if !path
        path = label
        label = path.gsub('/', '_')
      else
        path
        label
      end
    end
  end

  def engine
    wraith.engine.each { |label, browser| return browser }
  end

  def base_urls(path)
    wraith.base_domain + path unless wraith.base_domain.nil?
  end

  def compare_urls(path)
    wraith.comp_domain + path unless wraith.comp_domain.nil?
  end

  def file_names(width, label, domain_label)
    "#{directory}/#{label}/#{width}_#{engine}_#{domain_label}.png"
  end

  def save_images
    labels_paths.each do |label, path|
      base_url = base_urls(path)
      compare_url = compare_urls(path)

      wraith.widths.each do |width|
        base_file_name = file_names(width, label, wraith.base_domain_label)
        compare_file_name = file_names(width, label, wraith.comp_domain_label)
    
        wraith.capture_page_image engine, base_url, width, base_file_name unless base_url.nil?
        wraith.capture_page_image engine, compare_url, width, compare_file_name unless compare_url.nil?
      end
    end
  end
end
