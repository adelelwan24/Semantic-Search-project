from pymilvus.orm.search import  SearchResult
from typing import List, TypeVar


def Pre_Process(query: str) -> str:
    return query



def Format_Results(results : SearchResult) -> List[dict]:
    results = results[0]
    ret = []

    for match in results:
        data = {}
        data['id'] = match.id
        for key in match.entity.fields:
            data[key] = match.entity.get(key)
        ret.append(data)
    return ret

def Format_Exception(obj : TypeVar) -> str:
    return str(type(obj)).split(' ')[1].replace("'", '').replace(">", '').split('.')[-1]
