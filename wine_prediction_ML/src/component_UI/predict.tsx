"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Slider } from "../components/ui/slider"
import { Wine } from "lucide-react"

export default function WinePredictionForm() {
  const [formData, setFormData] = useState({
    fixedAcidity: 7.4,
    volatileAcidity: 0.7,
    citricAcid: 0.0,
    residualSugar: 1.9,
    chlorides: 0.076,
    freeSulfurDioxide: 11.0,
    totalSulfurDioxide: 34.0,
    density: 0.9978,
    pH: 3.51,
    sulphates: 0.56,
    alcohol: 9.4,
  })

  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (name: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Make POST request to your API endpoint
      const response = await fetch("http://localhost:5000/predict   ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Prediction failed")
      }

      const data = await response.json()
      setPrediction(data.prediction)
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-center mb-8">
        <Wine className="h-8 w-8 text-primary mr-2" />
        <h1 className="text-3xl font-bold">Wine Quality Prediction</h1>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Wine Properties</CardTitle>
            <CardDescription>Adjust the sliders to match your wine's chemical properties</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fixedAcidity">Fixed Acidity</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="fixedAcidity"
                      min={3}
                      max={15}
                      step={0.1}
                      value={[formData.fixedAcidity]}
                      onValueChange={(value) => handleChange("fixedAcidity", value[0])}
                    />
                    <span className="w-12 text-right">{formData.fixedAcidity}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volatileAcidity">Volatile Acidity</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="volatileAcidity"
                      min={0.1}
                      max={1.2}
                      step={0.01}
                      value={[formData.volatileAcidity]}
                      onValueChange={(value) => handleChange("volatileAcidity", value[0])}
                    />
                    <span className="w-12 text-right">{formData.volatileAcidity}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citricAcid">Citric Acid</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="citricAcid"
                      min={0}
                      max={1}
                      step={0.01}
                      value={[formData.citricAcid]}
                      onValueChange={(value) => handleChange("citricAcid", value[0])}
                    />
                    <span className="w-12 text-right">{formData.citricAcid}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="residualSugar">Residual Sugar</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="residualSugar"
                      min={0.5}
                      max={15}
                      step={0.1}
                      value={[formData.residualSugar]}
                      onValueChange={(value) => handleChange("residualSugar", value[0])}
                    />
                    <span className="w-12 text-right">{formData.residualSugar}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chlorides">Chlorides</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="chlorides"
                      min={0.01}
                      max={0.3}
                      step={0.001}
                      value={[formData.chlorides]}
                      onValueChange={(value) => handleChange("chlorides", value[0])}
                    />
                    <span className="w-12 text-right">{formData.chlorides}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="freeSulfurDioxide">Free Sulfur Dioxide</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="freeSulfurDioxide"
                      min={1}
                      max={100}
                      step={1}
                      value={[formData.freeSulfurDioxide]}
                      onValueChange={(value) => handleChange("freeSulfurDioxide", value[0])}
                    />
                    <span className="w-12 text-right">{formData.freeSulfurDioxide}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalSulfurDioxide">Total Sulfur Dioxide</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="totalSulfurDioxide"
                      min={5}
                      max={200}
                      step={1}
                      value={[formData.totalSulfurDioxide]}
                      onValueChange={(value) => handleChange("totalSulfurDioxide", value[0])}
                    />
                    <span className="w-12 text-right">{formData.totalSulfurDioxide}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="density">Density</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="density"
                      min={0.99}
                      max={1.01}
                      step={0.0001}
                      value={[formData.density]}
                      onValueChange={(value) => handleChange("density", value[0])}
                    />
                    <span className="w-12 text-right">{formData.density}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pH">pH</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="pH"
                      min={2.8}
                      max={4}
                      step={0.01}
                      value={[formData.pH]}
                      onValueChange={(value) => handleChange("pH", value[0])}
                    />
                    <span className="w-12 text-right">{formData.pH}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sulphates">Sulphates</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="sulphates"
                      min={0.3}
                      max={2}
                      step={0.01}
                      value={[formData.sulphates]}
                      onValueChange={(value) => handleChange("sulphates", value[0])}
                    />
                    <span className="w-12 text-right">{formData.sulphates}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alcohol">Alcohol</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      id="alcohol"
                      min={8}
                      max={15}
                      step={0.1}
                      value={[formData.alcohol]}
                      onValueChange={(value) => handleChange("alcohol", value[0])}
                    />
                    <span className="w-12 text-right">{formData.alcohol}</span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Predicting..." : "Predict Wine Quality"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediction Result</CardTitle>
            <CardDescription>Wine quality score (0-10)</CardDescription>
          </CardHeader>
          <CardContent>
            {prediction !== null ? (
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{prediction.toFixed(1)}</div>
                <div className="text-muted-foreground">
                  {prediction < 4 ? "Poor" : prediction < 6 ? "Average" : prediction < 8 ? "Good" : "Excellent"}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-16">
                Enter wine properties and click predict to see the quality score
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

