import webbrowser
import time

# Define the URL to be opened
url = "https://vief.in"

# Number of times to open the URL
times_to_open = 5

for i in range(times_to_open):
    print(f"Opening {url}, attempt {i + 1}")
    webbrowser.open(url)  # Open the URL in the default browser
    time.sleep(2)  # Wait 2 seconds before the next iteration (adjust as needed)