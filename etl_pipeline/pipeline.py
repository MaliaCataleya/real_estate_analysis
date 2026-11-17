from download import download_data
from transform import transform_data
from database import save_to_database

def main():
    filename = download_data()

    transform_data(filename)

    save_to_database(filename)

if __name__ == "__main__":
    main()