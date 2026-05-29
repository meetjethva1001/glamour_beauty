import { useState, useEffect } from 'react'
import { servicesApi, packagesApi } from '../api'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await servicesApi.getAll()
      setServices(res.data.services)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return { services, setServices, loading, error, refresh: fetchServices }
}

export function usePackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPackages = async () => {
    try {
      setLoading(true)
      const res = await packagesApi.getAll()
      setPackages(res.data.packages)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  return { packages, setPackages, loading, error, refresh: fetchPackages }
}
