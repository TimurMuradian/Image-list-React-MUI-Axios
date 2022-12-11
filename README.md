The component contains the following logic:

1. Get a list of images from the API (6 images by default). The request uses the axios library and an interceptor.

2. "Show more" button. When the user clicks on the button, the next 6 images are loaded (that is, there will already be 12 images on the page). If again, then the next 6 are loaded (and so on ad infinitum 🙂)

3. Pictures are clickable. When you click on an image, a popup/modal window will appear in which the following information of the selected image is displayed: author, original width and height of the image.

4. MUI library is used