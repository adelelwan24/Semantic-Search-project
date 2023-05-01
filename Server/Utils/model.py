from sentence_transformers import SentenceTransformer
import torch
from dotenv import load_dotenv
import os

load_dotenv()

model_name = os.getenv('MODEL_NAME', 'sentence-transformers/msmarco-bert-base-dot-v5')
assert model_name, "The model name is not avilable"

model = SentenceTransformer(model_name)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

print('Automatic Device Assigned: ', model.device)
model.to(device)
print('After Checking Cude: {}'.format(model.device))

if __name__ == "__main__":
    model.eval()
    encoded  = model.encode('hello world')
    print(encoded)
    print(type(encoded))
