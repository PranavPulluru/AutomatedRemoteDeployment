ARD — Automated Remote Deployment

Predictive and reactive drone deployment for disaster-resilient cellular connectivity.

Overview

Natural disasters such as hurricanes and typhoons can damage terrestrial cellular infrastructure, leaving affected communities without communication when they need it most.

ARD (Automated Remote Deployment) explores how drones carrying compact LTE network-in-a-box systems can provide temporary cellular coverage until terrestrial networks are restored.

ARD combines weather data, network information, and Python-based deployment planning to estimate the number of drones required and calculate their deployment coordinates.

It supports two approaches:

* Predictive deployment: Uses weather information to anticipate potential disruptions and prepare deployment plans in advance.
* Reactive deployment: Calculates drone requirements and positions in response to an actual or reported network outage.

How it works

1. Monitor: Retrieve weather information and evaluate potential disaster scenarios.
2. Plan: Estimate drone requirements using affected-cell coverage, user demand, and network configuration.
3. Position: Calculate proposed drone deployment coordinates and map compatible LTE network configurations.
4. Deploy: Use the deployment and UAV-control workflow to guide drones to their target positions.
5. Restore connectivity: Provide temporary LTE access through drone-mounted network-in-a-box systems.

Architecture

<escape>
Weather data / Network outage
             |
             v
   Predictive / Reactive
       deployment
             |
             v
   Python deployment planner
   - Drone count
   - Deployment coordinates
   - Network configuration
             |
             v
       UAV deployment
             |
             v
     Raspberry Pi 4
     +-------------+
     | srsRAN eNodeB|
     | srsEPC       |
     +-------------+
             |
            SDR
       (LTE TX/RX)
             |
             v
        LTE devices
             |
             v
   Available backhaul
   - Satellite internet
   - Terrestrial internet
   - Point-to-point radio
   - Other surviving networks
</escape>

Conceptual architecture. Backhaul options and complete drone integration are not all implemented in the current prototype.

Onboard LTE system

The intended drone payload uses a Raspberry Pi 4 to run the srsRAN LTE eNodeB and srsEPC. An attached software-defined radio (SDR) provides the radio interface for LTE transmission and reception.

A suitable antenna system, power supply, and backhaul connection are also required. The goal is a compact, drone-mounted LTE network-in-a-box.

Technology stack

* Python: Deployment calculations and planning.
* OpenWeatherMap API: Weather information for predictive planning.
* JavaScript / HTML: Application interface.
* MATLAB: UAV simulation and flight modelling.
* QGroundControl / MAVLink: Simulated UAV mission control.
* Raspberry Pi 4: LTE software platform.
* srsRAN 4G / srsEPC: Open-source LTE network proof of concept.
* SDR: Intended LTE radio hardware.

Testing and results

The research includes deployment-planning scenarios, simulated UAV flights, and an LTE proof of concept.

* Evaluated drone requirements for different coverage and user-demand scenarios.
* Simulated UAV movement using MATLAB and the Dryden turbulence model.
* Used QGroundControl to monitor simulated missions.
* Demonstrated a simulated LTE user attaching to srsRAN eNodeB and srsEPC running on a Raspberry Pi 4.

These results demonstrate feasibility, not a fully operational, field-tested disaster-recovery system.

Repository contents

* ard.py — Deployment calculations and weather-based planning logic.
* ARDbackend.js — Backend application component.
* Map.html — Deployment map interface.
* NetworkDeploymentScript/ — Supporting deployment scripts.
* drone.drawio and image assets — Project diagrams and illustrations.

Note: This repository does not currently contain a fork of srsRAN 4G. The LTE software is a separate open-source dependency.

Future work

* Improve disaster prediction and coverage modelling.
* Integrate with real mobile-network operator management systems.
* Develop and test the compact Raspberry Pi + SDR drone payload.
* Integrate actual drone flight control.
* Evaluate satellite, terrestrial, and radio-link backhaul.
* Test multi-drone coordination and real-world coverage.

Acknowledgments

* srsRAN 4G
* OpenWeatherMap
* QGroundControl

ARD is an independent research project exploring automated temporary cellular coverage for disaster response.
