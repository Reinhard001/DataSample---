const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export interface AnalysisRequest {
  analysis_name: string
  analysis_type: 'Random' | 'Stratified' | 'Cluster'
  description: string
  sample_fraction: number
}

export interface AnalysisResult {
  accuracy: number
  efficiency: number
  scalability: number
  dataPoints: number
  processingTime: string
  methodMetrics: Array<{
    id: string
    name: string
    efficiency: number
    accuracy: number
    scalability: number
    reason: string
  }>
  best: {
    efficiency: string
    accuracy: string
    scalability: string
  }
  insights: string[]
}

export const uploadDataset = async (file: File, metadata: Omit<AnalysisRequest, 'sample_fraction'>) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('analysis_name', metadata.analysis_name)
  formData.append('analysis_type', metadata.analysis_type)
  formData.append('description', metadata.description)

  const response = await fetch(`${API_BASE_URL}/api/analysis/upload-dataset`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data.dataset_id
}

export const analyzeDataset = async (
  datasetId: string,
  sampleFraction: number,
  analysisType: string
): Promise<AnalysisResult> => {
  const response = await fetch(`${API_BASE_URL}/api/analysis/analyze/${datasetId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      analysis_type: analysisType,
      sample_fraction: sampleFraction,
    }),
  })

  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export const getDatasets = async () => {
  const response = await fetch(`${API_BASE_URL}/api/datasets`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error(`Fetch datasets failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data
}
