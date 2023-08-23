import cv2
import json
import argparse

def process_image(image_path):
    # Load the PNG map
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    original_image = cv2.imread(image_path)  # Load original image to draw on

    # Apply adaptive thresholding
    thresholded = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 11, 2)

    # Apply erosion and dilation
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    eroded = cv2.erode(thresholded, kernel, iterations=1)
    dilated = cv2.dilate(eroded, kernel, iterations=1)

    # Find contours (outlines)
    contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Fill the contours on the original image (using -1 for thickness fills the contour)
    cv2.drawContours(original_image, contours, -1, (0, 255, 0), -1)

    # Visualize the intermediate steps
    cv2.imshow('Thresholded', thresholded)
    cv2.imshow('Eroded and Dilated', dilated)
    cv2.imshow('Original with Filled Contours', original_image)  # Display original with filled contours
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    # Convert contours into objects
    building_outlines = []
    for contour in contours:
        outline = [point[0].tolist() for point in contour]
        building_outlines.append(outline)

    # Serialize objects into JSON
    json_data = json.dumps(building_outlines)

    # Save JSON to a file
    with open('building-outlines.json', 'w') as file:  # Changed file name as requested
        json.dump(building_outlines, file)

    print(f'Processed {len(building_outlines)} buildings and saved to building-outlines.json.')  # Changed file name in message

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process a PNG map to detect building outlines.')
    parser.add_argument('image_path', type=str, help='Path to the PNG image file.')

    args = parser.parse_args()
    process_image(args.image_path)
