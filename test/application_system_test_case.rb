require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chromedriver, screen_size: [ 1400, 1400 ]
  # driven_by :cuprite
end
