require "wraith/helpers/custom_exceptions"

def convert_to_absolute(filepath)
  if !filepath
    'false'
  elsif filepath[0] == '/'
    # filepath is already absolute. return unchanged
    filepath
  else
    # filepath is relative. it must be converted to absolute
    "#{Dir.pwd}/#{filepath}"
  end
end

def verbose_log(message)
  if $wraith.verbose
    puts message
  end
end

def error(message)
  abort "Error: #{message}"
end

def warning(message)
  puts "Warning: #{message}"
end
