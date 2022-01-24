package models

type DeploymentType string
type Locale string

const DeploymentCloud DeploymentType = "Cloud"
const LocaleEnUS Locale = "en_US"

type JiraServerInfo struct {
	BaseURL       string `json:"baseUrl"`
	BuildDate     string `json:"buildDate"`
	BuildNumber   int    `json:"buildNumber"`
	DefaultLocale struct {
		Locale Locale `json:"locale"`
	} `json:"defaultLocale"`
	DeploymentType DeploymentType `json:"deploymentType"`
	ScmInfo        string         `json:"ScmInfo"`
	ServerTime     string         `json:"serverTime"`
	ServerTitle    string         `json:"serverTitle"`
	Version        string         `json:"version"`
	VersionNumbers []int          `json:"versionNumbers"`
}

type ApiMyselfResponse struct {
	AccountId   string
	DisplayName string
}
