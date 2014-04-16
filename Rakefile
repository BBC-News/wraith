$:.unshift File.join(File.dirname(__FILE__), 'lib')

require 'bundler/gem_tasks'
require 'wraith/save_images'
require 'wraith/crop'
require 'wraith/spider'
require 'wraith/folder'
require 'wraith/thumbnails'
require 'wraith/compare_images'
require 'wraith/images'
require 'wraith/gallery'

@config = ('config')

desc "Execute wraith on two sites with a config you specify"
task :config, [:yaml] do |t, custom|
  custom.with_defaults(:yaml => "config")
  @config = "#{custom[:yaml]}"
  Rake::Task["default"].invoke
end

task :default => [:reset_shots_folder, :check_for_paths, :setup_folders, :save_images, :check_images, :crop_images, :compare_images, :generate_thumbnails, :generate_gallery] do
  puts 'Done!';
end

task :reset_shots_folder do
  reset = FolderManager.new(@config)
  reset.clear_shots_folder
end

task :setup_folders do
  create = FolderManager.new(@config)
  create.create_folders
end

task :compare_images do
  compare = CompareImages.new(@config)
  compare.compare_images
end

task :check_for_paths do
  spider = Spidering.new(@config)
  spider.check_for_paths
end

task :save_images do
  capture_images = SaveImages.new(@config)
  capture_images.save_images
end

task :crop_images do
  crop = CropImages.new(@config)
  crop.crop_images
end

task :check_images do
  image = Images.new(@config)
  image.files
end

task :generate_thumbnails do
  thumbs = Images.new(@config)
  thumbs.generate_thumbnails
end

task :generate_gallery do
  gallery = GalleryGenerator.new(@config)
  gallery.generate_gallery
end

desc "Execute wraith on a single site, no image diffs, with a config you specify"
task :grabber, [:yaml] do |t, custom|
  custom.with_defaults(:yaml => "config")
  @config = "#{custom[:yaml]}"
  Rake::Task["grab"].invoke
end

desc "Execute wraith on a single site, no image diffs"
task :grab => [:reset_shots_folder, :check_for_paths, :setup_folders, :save_images, :generate_thumbnails, :generate_gallery] do
  puts 'Done!';
end
