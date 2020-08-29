import plotly.graph_objects as go
import numpy as np

t = np.linspace(5, 25, 300)
y = np.sin(t)

fig = go.Figure(data=go.Scatter(x=t, y=y, mode='markers'))
fig.show()