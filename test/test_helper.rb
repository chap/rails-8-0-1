ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

require "database_cleaner"
require "database_cleaner_support"

# DatabaseCleaner.clean_with :truncation
DatabaseCleaner.strategy = :transaction



module ActiveSupport
  class TestCase
    include DatabaseCleanerSupport

    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...

    Capybara.register_driver :chrome do |app|
      Capybara::Selenium::Driver.new app, browser: :chrome,
        options: Selenium::WebDriver::Chrome::Options.new(args: %w[headless disable-gpu])
    end

    Capybara.javascript_driver = :chrome
  end
end
