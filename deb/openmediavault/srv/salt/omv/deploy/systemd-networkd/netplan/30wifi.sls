# This file is part of OpenMediaVault.
#
# @license   https://www.gnu.org/licenses/gpl.html GPL Version 3
# @author    Volker Theile <volker.theile@openmediavault.org>
# @copyright Copyright (c) 2009-2025 Volker Theile
#
# OpenMediaVault is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# any later version.
#
# OpenMediaVault is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with OpenMediaVault. If not, see <https://www.gnu.org/licenses/>.

{% set interfaces = salt['omv_conf.get_by_filter'](
  'conf.system.network.interface',
  {'operator': 'stringEquals', 'arg0': 'type', 'arg1': 'wifi'}) %}

{% for interface in interfaces %}

configure_netplan_wifi_{{ interface.devicename }}:
  file.managed:
    - name: "/etc/netplan/30-openmediavault-{{ interface.devicename }}.yaml"
    - source:
      - salt://{{ tpldir }}/files/wifi.j2
    - template: jinja
    - context:
        interface: {{ interface | json }}
    - user: root
    - group: root
    - mode: 600

{% endfor %}
