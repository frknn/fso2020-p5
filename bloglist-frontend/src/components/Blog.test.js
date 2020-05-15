import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blog = {
    title: 'test title',
    author: 'test author',
    url: 'test-url.com',
    likes: 3,
    user: {
      name: 'test name',
      username: 'test username',
      id: 'test id'
    }
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('at start only title and author are displayed', () => {
    const div = component.container.querySelector('.not-expanded')
    expect(div).toHaveTextContent(
      'test title - test author'
    )
    expect(div).not.toHaveTextContent('url: test-url.com')
    expect(div).not.toHaveTextContent('likes: 3')
    expect(div).not.toHaveTextContent('user: test name')
  })

  test('url and likes displayed after clicking view button', () => {

    const div = component.container.querySelector('.expanded')
    expect(div).toHaveTextContent(
      'test title - test author'
    )
    expect(div).toHaveTextContent('url: test-url.com')
    expect(div).toHaveTextContent('likes: 3')
    expect(div).toHaveTextContent('user: test name')

  })

  test.only('handler button of like called the amount of times that the like button is clicked', () => {
    const mockHandler = jest.fn()

    let blog = {
      title: 'test title',
      author: 'test author',
      url: 'test-url.com',
      likes: 3,
      user: {
        name: 'test name',
        username: 'test username',
        id: 'test id'
      }
    }

    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )

    const button = component.container.querySelector('like-btn')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})