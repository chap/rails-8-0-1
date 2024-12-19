require "minitest/autorun"
require "net/http"
require "json"

class PostsTest < Minitest::Test
  DEFAULT_HOST = ENV["DEFAULT_HOST"] || "http://localhost:3000"

  def test_visiting_the_index
    uri = URI("#{DEFAULT_HOST}/posts.json")
    response = Net::HTTP.get_response(uri)
    assert response.is_a?(Net::HTTPSuccess), "Index request should succeed"
    posts = JSON.parse(response.body)
    assert posts.is_a?(Array), "Response should be an array of posts"
  end

  def test_should_create_post
    uri = URI("#{DEFAULT_HOST}/posts.json")
    req = Net::HTTP::Post.new(uri, { "Content-Type" => "application/json" })
    req.body = { post: { body: "Test body", title: "Test title" } }.to_json

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http| http.request(req) }
    assert response.is_a?(Net::HTTPCreated), "Post creation should succeed"
    post = JSON.parse(response.body)
    assert_equal "Test body", post["body"], "Post body should match"
    assert_equal "Test title", post["title"], "Post title should match"
  end

  def test_should_update_post
    post_id = create_test_post
    uri = URI("#{DEFAULT_HOST}/posts/#{post_id}.json")
    req = Net::HTTP::Patch.new(uri, { "Content-Type" => "application/json" })
    req.body = { post: { body: "Updated body", title: "Updated title" } }.to_json

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http| http.request(req) }
    assert response.is_a?(Net::HTTPSuccess), "Post update should succeed"
    post = JSON.parse(response.body)
    assert_equal "Updated body", post["body"], "Updated post body should match"
    assert_equal "Updated title", post["title"], "Updated post title should match"
  end

  def test_should_destroy_post
    post_id = create_test_post
    uri = URI("#{DEFAULT_HOST}/posts/#{post_id}.json")
    req = Net::HTTP::Delete.new(uri, { "Content-Type" => "application/json" })

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http| http.request(req) }
    assert response.is_a?(Net::HTTPSuccess), "Post deletion should succeed"
  end

  private

  def create_test_post
    uri = URI("#{DEFAULT_HOST}/posts.json")
    req = Net::HTTP::Post.new(uri, { "Content-Type" => "application/json" })
    req.body = { post: { body: "Test body", title: "Test title" } }.to_json

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') { |http| http.request(req) }
    post = JSON.parse(response.body)
    post["id"]
  end
end
