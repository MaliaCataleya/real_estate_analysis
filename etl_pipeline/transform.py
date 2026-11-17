import pandas
import numpy as np
from pathlib import Path

def replace_missing_values(df, target_col, col1, col2):
    mask = df[target_col].isna() | (df[target_col] == 0) | (df[target_col] == np.inf)
    df.loc[mask, target_col] = np.round((df.loc[mask, col1] / df.loc[mask, col2]), 2)
    return df

def transform_data(filename):
    df = pandas.read_csv(f'/app/data/{filename}')

    df.dropna(subset=['rps27', 'rps21_amountsunitdollars'], inplace=True)
    df.drop(df[df['rps03_area'] == 0].index,inplace=True)

    df = replace_missing_values(df, 'rps22_amountsunitdollars', 'rps21_amountsunitdollars', 'rps03_area')

    df = df.fillna(0)

    df['rps14_yyymmddroc'] = df['rps14_yyymmddroc'].astype(int)
    df['rps32'] = df['rps32'].astype(int)
    df['rps22_amountsunitdollars'] = df['rps22_amountsunitdollars'].astype(int)

    if not Path(f"/app/data/{filename}.csv").exists():
        df.to_csv(f'/app/data/{filename}.csv')

