from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import torch
import os

load_dotenv()

model_name = os.getenv('MODEL_NAME', 'msmarco-bert-base-dot-v5')
assert model_name, "The model name is not avilable"

model = SentenceTransformer(model_name)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model.to(device)
print('After Checking Cude: {}'.format(model.device))

if __name__ == "__main__":
    model.eval()
    encoded = model.encode('hello world')
    print(encoded)
    print(type(encoded))
