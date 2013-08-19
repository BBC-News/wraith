# Wraith

 * Website: http://responsivenews.co.uk
 * Source: http://github.com/bbc-news/wraith

Wraith is a screenshot comparison tool, created by developers at BBC News.


## What is it?

Wraith uses either [PhantomJS](http://phantomjs.org) or
[SlimerJS](http://slimerjs.org) to create screenshots of different environments
and then creates a diff of the two images, the affected areas are highlighted in
blue

![Photo of BBC News with a
diff](http://bbc-news.github.io/wraith/images/320_diff.png)


## Requirements

You'll need either PhantomJS or SlimerJS, ImageMagick & Ruby 1.9.3 or greater.
It's up to you to decide which browser engine you want to run it against.

On Mac OS X, the install script will install PhantomJS & ImageMagick for you,
assuming you have [homebrew](http://brew.sh) installed, otherwise it'll tell
you to install them.

Also install the image_size gem
`gem install image_size`

On Ubuntu 12.04, you will need to apt-get the following packages:

* libicu-dev
* imagemagick
* rake


And then download the PhantomJS binary package from
[http://phantomjs.org/](http://phantomjs.org/).

## Installation

```sh
curl -fsSL https://raw.github.com/bbc-news/wraith/go | bash
```


## Config

All config will be placed in config.yml. You can specify domains, paths, screen
widths & HTTP headers.

```yaml
# Add only 2 domains, key will act as a label
domains:
  english: "http://www.live.bbc.co.uk/news"
  russian: "http://www.live.bbc.co.uk/russian"

#Type screen widths below, here are a couple of examples
screen_widths:
  - 320
  - 600
  - 768
  - 1024
  - 1280

#Type page URL paths below, here are a couple of examples
paths:
  home: /
  uk_index: /uk
```


## Using Wraith

```sh
rake wraith:process_run
```
This will use the the configuration file 'config.yaml'

## Output

After each screenshot is captured, the compare task will run, this will output a diff.png and a data.txt.  The data.txt for each file will show the number of pixels that have changed.  There is a main data.txt which is in the root of the output folder that will combine all of these values to easier view all the pixel changes.

## Gallery

A gallery is available to view each of the images and the respective diff images located in the shots folder once all the images have been compared.

## Alternative configuration file.
To specify an alternative configuration use this form of the rake task:

```sh
rake wraith:process_run[path/to/config]
```

## Contributing

If you want to add functionality to this project, pull requests are welcome.

 * Create a branch based off master and do all of your changes with in it.
 * If you have to pause to add a 'and' anywhere in the title, it should be two pull requests.
 * Make commits of logical units and describe them properly
 * Check for unnecessary whitespace with git diff --check before committing.
 * If possible, submit tests to your patch / new feature so it can be tested easily.
 * Assure nothing is broken by running all the test
 * Please ensure that it complies with coding standards.

**Please raise any issues with this project as a GitHub issue.**

## Running Tests

    rspec

## Changelog - updated 18/8/13
    Merge pull request #27 from reggieb/code_tidy
    Merge pull request #24 from hoguej/feature/unit_tests
    Merge pull request #21 from doryphores/sort_files_before_compare
    Merge pull request #13 from BBC-News/crop-images
    Merge pull request #18 from ecometrica/gallery
    Merge pull request #15 from timabell/move-data-file
    Merge pull request #14 from timabell/unnamed-paths
    Merge pull request #5 from BBC-News/typekit-fix
    Merge pull request #8 from jaredly/patch-1
    Merge pull request #2 from Kami/fix_ruby_compatibility
    Merge pull request #1 from BBC-News/freedom

## License

Wraith is available to everyone under the terms of the Apache 2.0 open source licence. 
Take a look at the LICENSE file in the code.

## Credits

 * [Dave Blooman](http://twitter.com/dblooman)
 * [John Cleveley](http://twitter.com/jcleveley)
 * [Simon Thulbourn](http://twitter.com/sthulbourn)

