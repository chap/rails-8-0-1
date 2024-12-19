import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './index';

test('renders journal header', () => {
  render(<App />);
  const header = screen.getByText(/journal/i);
  expect(header).toBeInTheDocument();
});

test('displays posts and allows adding a post', async () => {
  render(<App />);

  // Add a post
  const titleInput = screen.getByPlaceholderText(/title/i);
  const bodyInput = screen.getByPlaceholderText(/body/i);
  const submitButton = screen.getByText(/add post/i);

  fireEvent.change(titleInput, { target: { value: 'Test Post' } });
  fireEvent.change(bodyInput, { target: { value: 'This is a test post.' } });
  fireEvent.click(submitButton);

  // Check if the post is displayed
  await waitFor(() => {
    const postTitle = screen.getByText(/test post/i);
    const postBody = screen.getByText(/this is a test post/i);
    expect(postTitle).toBeInTheDocument();
    expect(postBody).toBeInTheDocument();
  });
});
